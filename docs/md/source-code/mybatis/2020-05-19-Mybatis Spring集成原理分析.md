---
title: 10.Mybatis Spring集成原理分析
tags:
  - MyBatis
permalink: '/posts/4771b328.html'
date: 2020-05-19 00:00:00
updated: 2020-05-19 00:00:00
---

# Mybatis Spring集成原理分析

> 作者：IT王小二
>
> 博客：[https://itwxe.com](https://itwxe.com/)

下载整合源码包：[https://github.com/mybatis/spring](https://github.com/mybatis/spring)，执行 `mvn clean install -Dmaven.test.skip=true` 命令将其安装到本地，然后就可以在spring项目中引用了。

## 一、集成配置过程

1、准备 spring 项目一个，添加依赖，当然，实际开发使用正常版本即可，不需要使用本地源码版本。

```xml
	<!-- mybatis与spring对接依赖 -->
	<dependency>
		<groupId>org.mybatis</groupId>
		<artifactId>mybatis-spring</artifactId>
		<version>1.3.3-SNAPSHOT</version>
	</dependency>
```

2、在 applicationContext.xml 中配置几个重要的属性。

- **配置 SqlSessionFactoryBean**
    - dataSource：用于配置数据源，该属性为必选项，必须通过这个属性配置据源。
    - mapper Locations ： 配置 SqlSessionFactoryBean 扫描 XML 映射文件的路径。
    - configLocation：用于配置mybatisConfig XML的路径，除了数据源外，对MyBati的各种配置仍然可以通过这种方式进行，并且配置 MyBatis settings 时只能使用这种方式。但配置文件中任意环境,数据源 和 MyBatis 的事务管理器都会被忽略。
    - typeAliasesPackage： 配置包中类的别名，配置后，包中的类在 XML 映射文件中使用时可以省略包名部分 ，直接使用类名。这个配置不支持 Ant 风格的路径，当需要配置多个包路径时可以使用分号或逗号进行分隔。

```xml
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource"
	init-method="init" destroy-method="close">
    <!-- 基本属性 url、user、password -->
    <property name="driverClassName" value="${jdbc_driver}" />
    <property name="url" value="${jdbc_url}" />
    <property name="username" value="${jdbc_username}" />
    <property name="password" value="${jdbc_password}" />
    
    <!-- 配置初始化大小、最小、最大 -->
    <property name="initialSize" value="1" />
    <property name="minIdle" value="1" />
    <property name="maxActive" value="20" />
    
    <!-- 配置获取连接等待超时的时间 -->
    <property name="maxWait" value="60000" />
    
    <!-- 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒 -->
    <property name="timeBetweenEvictionRunsMillis" value="60000" />
    
    <!-- 配置一个连接在池中最小生存的时间，单位是毫秒 -->
    <property name="minEvictableIdleTimeMillis" value="300000" />
    
    <property name="validationQuery" value="SELECT 'x'" />
    <property name="testWhileIdle" value="true" />
    <property name="testOnBorrow" value="false" />
    <property name="testOnReturn" value="false" />

    <!-- 配置监控统计拦截的filters -->
    <property name="filters" value="stat" />
</bean>

<!-- 配置sqlSessionFactory -->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource" />
    <property name="typeAliasesPackage" value="com.study.mybatis.entity" />
    <property name="mapperLocations" value="classpath:mapping/*.xml" />
</bean>
```

- **配置 MapperScannerConfigurer**，通过 MapperScannerConfigurer 类自动扫描所有的 Mapper 接口，使用时可以直接注入接口，MapperScannerConfigurer 中常配置以下两个属性。
    - basePackage：用于配置基本的包路径。可以使用分号或逗号作为分隔符设置多于一个的包路径，每个映射器将会在指定的包路径中递归地被搜索到 。
    - annotationClass：用于过滤被扫描的接口，如果设置了该属性，那么 MyBatis 的接口只有包含该注解才会被扫描进去。

```xml
<!-- DAO接口所在包名，Spring会自动查找其下的类 -->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="basePackage" value="com.enjoylearning.mybatis.mapper" />
</bean>
```

- **配置事务**，让 Mybatis 集成 spring 的事务。

```xml
<!-- (事务管理)transaction manager -->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource" />
    <qualifier value="transactionManager" />
</bean>

<tx:annotation-driven transaction-manager="transactionManager" />
```

## 二、MyBatis Spring 集成原理分析

### 1. SqlSessionFactoryBean源码分析

前面提到了配置 SqlSessionFactoryBean，那么我们来看下 SqlSessionFactoryBean，其实在这个类加载过程中就是执行我描述 MyBatis 流程的第一个阶段：[初始化阶段](https://uukongjian.com/posts/31cd1854/)，其中几个重要方法如下：

```java
public class SqlSessionFactoryBean implements FactoryBean<SqlSessionFactory>, InitializingBean, ApplicationListener<ApplicationEvent> {

  /**
   * 在spring容器中创建全局唯一的sqlSessionFactory
   */
  @Override
  public void afterPropertiesSet() throws Exception {
    notNull(dataSource, "Property 'dataSource' is required");
    notNull(sqlSessionFactoryBuilder, "Property 'sqlSessionFactoryBuilder' is required");
    state((configuration == null && configLocation == null) || !(configuration != null && configLocation != null), "Property 'configuration' and 'configLocation' can not specified with together");
    // 封装了对MyBatis初始化阶段
    this.sqlSessionFactory = buildSqlSessionFactory();
  }
  
  /**
   * 
   * 将SqlSessionFactory对象注入spring容器
   */
  @Override
  public SqlSessionFactory getObject() throws Exception {
    if (this.sqlSessionFactory == null) {
      afterPropertiesSet();
    }
    return this.sqlSessionFactory;
  }
}
```

1. 首先，SqlSessionFactoryBean 实现了 InitializingBean 接口，那么容器在初始化完成 SqlSessionFactoryBean 之后必然会调用 afterPropertiesSet() 方法，其中调用的 buildSqlSessionFactory()方法实际是对 MyBatis 初始化加载配置阶段的封装。
2. 其次，SqlSessionFactoryBean 实现了 FactoryBean 接口，当在容器中配置 FactoryBean 的实现类时，并不是将该 FactoryBean 注入到容器，而是调用 FactoryBean 的 getObject 方法产生的实例对象注入容器。

### 2. MapperScannerConfigurer源码分析

这个就是为了帮助我们进行实现 mapper接口类，这个对应的就是我描述的 MyBatis 流程的第二个阶段：[代理封装阶段](https://itwxe.com/posts/739d411b/) 。

**MapperFactoryBean**

首先来说说另外一个类：MapperFactoryBean，除了 MapperScannerConfigurer 配置方式以外，还有一种配置方式，不过我们一般都不会这么使用，但是实际上真正帮助 Spring 生成 Mapper 接口实现类的恰恰就是它。

```java
<bean id="tUserMapper" class="org.mybatis.spring.mapper.MapperFactoryBean">
	<property name="mapperInterface" value="com.study.mybatis.mapper.TUserMapper"></property>
	<property name="sqlSessionFactory" ref="sqlSessionFactory"></property>
</bean>
```

那么看下 MapperFactoryBean 里面有什么东西。

```java
public class MapperFactoryBean<T> extends SqlSessionDaoSupport implements FactoryBean<T> {

  private Class<T> mapperInterface;

  private boolean addToConfig = true;

  public MapperFactoryBean() {
    //intentionally empty 
  }
  
  public MapperFactoryBean(Class<T> mapperInterface) {
    this.mapperInterface = mapperInterface;
  }

  /**
   * MapperFactoryBean在容器初始化时，要确保mapper接口被注册到mapperRegistry
   */
  @Override
  protected void checkDaoConfig() {
    super.checkDaoConfig();

    notNull(this.mapperInterface, "Property 'mapperInterface' is required");
    // 通过SqlSession从容器中拿到configuration
    Configuration configuration = getSqlSession().getConfiguration();
    if (this.addToConfig && !configuration.hasMapper(this.mapperInterface)) {
      try {
    	// 如果mapperRegistry中不包含当前接口的动态代理工厂，则添加一个
        configuration.addMapper(this.mapperInterface);
      } catch (Exception e) {
        logger.error("Error while adding the mapper '" + this.mapperInterface + "' to configuration.", e);
        throw new IllegalArgumentException(e);
      } finally {
        ErrorContext.instance().reset();
      }
    }
  }

  /**
   * 通过在容器中的mapperRegistry，返回当前mapper接口的动态代理
   * 
   * {@inheritDoc}
   */
  @Override
  public T getObject() throws Exception {
    return getSqlSession().getMapper(this.mapperInterface);
  }
  
  // 省略其他代码 
}
```

MapperFactoryBean 实现了 FactoryBean 接口，getObject 方法实际是封装了 MyBatis 的第二阶段，注入容器的是 SqlSession 实例化的 Mapper 接口的实现类。

**MapperScannerConfigurer**

由于使用 MapperFactoryBean 每个接口都要维护一个 mapperInterface 过于麻烦，且不好维护，所以就是用这个来扫描包下面的接口，然后为其生成 MapperFactoryBean，来看下 MapperScannerConfigurer 的源码。

```java
public class MapperScannerConfigurer implements BeanDefinitionRegistryPostProcessor, InitializingBean, ApplicationContextAware, BeanNameAware {

  @Override
  public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) {
    if (this.processPropertyPlaceHolders) {
      // 占位符处理
      processPropertyPlaceHolders();
    }
    // 实例化ClassPathMapperScanner，并对scanner相关属性进行配置
    ClassPathMapperScanner scanner = new ClassPathMapperScanner(registry);
    scanner.setAddToConfig(this.addToConfig);
    scanner.setAnnotationClass(this.annotationClass);
    scanner.setMarkerInterface(this.markerInterface);
    scanner.setSqlSessionFactory(this.sqlSessionFactory);
    scanner.setSqlSessionTemplate(this.sqlSessionTemplate);
    scanner.setSqlSessionFactoryBeanName(this.sqlSessionFactoryBeanName);
    scanner.setSqlSessionTemplateBeanName(this.sqlSessionTemplateBeanName);
    scanner.setResourceLoader(this.applicationContext);
    scanner.setBeanNameGenerator(this.nameGenerator);
    // 根据上述配置，生成过滤器，只扫描合条件的class
    scanner.registerFilters();
    // 扫描指定的包以及其子包
    scanner.scan(StringUtils.tokenizeToStringArray(this.basePackage, ConfigurableApplicationContext.CONFIG_LOCATION_DELIMITERS));
  }
  
  // 省略其他代码
}
```

看到实现了 BeanDefinitionRegistryPostProcessor 接口，因此可以对 Bean 的结构调整之后再注入容器。那 MapperScannerConfigurer 在扫描完这些 mapper 接口之后，主要是将 Mapper 接口一个个的转换成 MapperFactoryBean 之后注入容器的。

跟踪一下 scanner.scan，最后发现具体转换代码在 `org.mybatis.spring.mapper.ClassPathMapperScanner#processBeanDefinitions`

```java
  /**
   *处理扫描得到的BeanDefinitionHolder集合，将集合中的每一个mapper接口转换成MapperFactoryBean后，注册至spring容器
   */
  private void processBeanDefinitions(Set<BeanDefinitionHolder> beanDefinitions) {
    GenericBeanDefinition definition;
    // 遍历集合
    for (BeanDefinitionHolder holder : beanDefinitions) {
      definition = (GenericBeanDefinition) holder.getBeanDefinition();

      if (logger.isDebugEnabled()) {
        logger.debug("Creating MapperFactoryBean with name '" + holder.getBeanName() 
          + "' and '" + definition.getBeanClassName() + "' mapperInterface");
      }

      // the mapper interface is the original class of the bean
      // but, the actual class of the bean is MapperFactoryBean
      // 增加一个构造方法，接口类型作为构造函数的入参
      definition.getConstructorArgumentValues().addGenericArgumentValue(definition.getBeanClassName()); // issue #59
      // 将bean的类型转换成mapperFactoryBean
      definition.setBeanClass(this.mapperFactoryBean.getClass());
      // 增加addToConfig属性
      definition.getPropertyValues().add("addToConfig", this.addToConfig);

      boolean explicitFactoryUsed = false;
      // 增加sqlSessionFactory属性
      if (StringUtils.hasText(this.sqlSessionFactoryBeanName)) {
        definition.getPropertyValues().add("sqlSessionFactory", new RuntimeBeanReference(this.sqlSessionFactoryBeanName));
        explicitFactoryUsed = true;
      } else if (this.sqlSessionFactory != null) {
        definition.getPropertyValues().add("sqlSessionFactory", this.sqlSessionFactory);
        explicitFactoryUsed = true;
      }
      // 增加sqlSessionTemplate属性
      if (StringUtils.hasText(this.sqlSessionTemplateBeanName)) {
        if (explicitFactoryUsed) {
          logger.warn("Cannot use both: sqlSessionTemplate and sqlSessionFactory together. sqlSessionFactory is ignored.");
        }
        definition.getPropertyValues().add("sqlSessionTemplate", new RuntimeBeanReference(this.sqlSessionTemplateBeanName));
        explicitFactoryUsed = true;
      } else if (this.sqlSessionTemplate != null) {
        if (explicitFactoryUsed) {
          logger.warn("Cannot use both: sqlSessionTemplate and sqlSessionFactory together. sqlSessionFactory is ignored.");
        }
        definition.getPropertyValues().add("sqlSessionTemplate", this.sqlSessionTemplate);
        explicitFactoryUsed = true;
      }

      // 修改自动注入的方式 bytype
      if (!explicitFactoryUsed) {
        if (logger.isDebugEnabled()) {
          logger.debug("Enabling autowire by type for MapperFactoryBean with name '" + holder.getBeanName() + "'.");
        }
        definition.setAutowireMode(AbstractBeanDefinition.AUTOWIRE_BY_TYPE);
      }
    }
  }
```

> 都读到这里了，来个 **点赞、评论、关注、收藏** 吧！
