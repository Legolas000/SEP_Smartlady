package com.sliit.smartlady.configuration;

import com.sliit.smartlady.service.ADPaymentDAO;
import com.sliit.smartlady.service.ADPaymentDAOImpl;
import com.sliit.smartlady.service.AdvertisementDAO;
import com.sliit.smartlady.service.AdvertisementDAOImpl;
import com.sliit.smartlady.service.ArticleDAO;
import com.sliit.smartlady.service.ArticleDAOImpl;
import com.sliit.smartlady.service.CategoryDAO;
import com.sliit.smartlady.service.CategoryDAOImpl;
import com.sliit.smartlady.service.SubCategoryDAO;
import com.sliit.smartlady.service.SubCategoryDAOImpl;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
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
		dataSource.setUrl("jdbc:mysql://localhost/sepii_smartlady");
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
	public SubCategoryDAO getSubCategoryDAO()
	{
		return new SubCategoryDAOImpl(getDataSource());
	}
	
	@Bean
	public ArticleDAO getArticleDAO()
	{
		return new ArticleDAOImpl(getDataSource());
	}
	
	@Bean
	public AdvertisementDAO getAdvertisementDAO()
	{
		return new AdvertisementDAOImpl(getDataSource());
	}
	
	@Bean
	public ADPaymentDAO getADPaymentDAO()
	{
		return new ADPaymentDAOImpl(getDataSource());
	}
	
}
