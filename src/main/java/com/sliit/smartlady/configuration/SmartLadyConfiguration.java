package com.sliit.smartlady.configuration;

import com.sliit.smartlady.service.*;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import javax.sql.DataSource;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.sliit.smartlady")
public class SmartLadyConfiguration extends WebMvcConfigurerAdapter{

	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix("/WEB-INF/views/");
		viewResolver.setSuffix(".jsp");
		registry.viewResolver(viewResolver);
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/static/**").addResourceLocations("/static/");
	}

	@Bean
	public DataSource getDataSource()
	{
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName("com.mysql.jdbc.Driver");
		dataSource.setUrl("jdbc:mysql://localhost/smartlady");
		dataSource.setUsername("root");
		dataSource.setPassword("");

		return dataSource;
	}

	@Bean
	public CategoryDAO getCategoryDAO()
	{
		return new CategoryDAOImpl(getDataSource());
	}

	@Bean
	public ArticleDAO getArticleDAO()
	{
		return new ArticleDAOImpl(getDataSource());
	}

	@Bean
	public UserDAO getUserDAO()
	{
		return new UserDAOImpl(getDataSource());
	}

	@Bean
	public AdvertisementDAO getAdvertisementDAO()
	{
		return new AdvertisementDAOImpl(getDataSource());
	}

	@Bean
	public FeaturedArticleDAO getFeaturedArticleDAO()
	{
		return new FeaturedArticleDAOImpl(getDataSource());
	}

	@Bean(name = "multipartResolver")
	public MultipartResolver getMultipartResolver() {
		CommonsMultipartResolver resover = new CommonsMultipartResolver();
		// 1MB
		resover.setMaxUploadSize(1 * 1024 * 1024);

		return resover;
	}


}
