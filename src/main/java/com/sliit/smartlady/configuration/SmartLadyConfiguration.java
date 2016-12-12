package com.sliit.smartlady.configuration;

import com.sliit.smartlady.service.*;

import com.sliit.smartlady.service.AdvertisementDAO;
import com.sliit.smartlady.service.AdvertisementDAOImpl;
import com.sliit.smartlady.service.ArticleDAO;
import com.sliit.smartlady.service.ArticleDAOImpl;
import com.sliit.smartlady.service.CategoryDAO;
import com.sliit.smartlady.service.CategoryDAOImpl;
import com.sliit.smartlady.service.UserDAO;
import com.sliit.smartlady.service.UserDAOImpl;
import com.sliit.smartlady.service.administrator.*;
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
		dataSource.setUrl("jdbc:mysql://localhost/sepii_smartlady_v6");
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

	@Bean
	public AdPaymentDAO getAdPaymentDAO() { return new AdPaymentDAOImpl(getDataSource());}


	@Bean
	public CommentsDAO getCommentsDAO()
	{
		return new CommentsDAOImpl(getDataSource());
	}

	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver createMultipartResolver() {
		CommonsMultipartResolver resolver=new CommonsMultipartResolver();
		resolver.setDefaultEncoding("utf-8");
		return resolver;
	}

	//Administrator Beans
	@Bean
	public com.sliit.smartlady.service.administrator.CategoryDAO getAdminCategoryDAO()
	{
		return new com.sliit.smartlady.service.administrator.CategoryDAOImpl(getDataSource());
	}

	@Bean
	public com.sliit.smartlady.service.administrator.SubCategoryDAO getSubCategoryDAO()
	{
		return new com.sliit.smartlady.service.administrator.SubCategoryDAOImpl(getDataSource());
	}

	@Bean
	public com.sliit.smartlady.service.administrator.ArticleDAO getAdminArticleDAO()
	{
		return new com.sliit.smartlady.service.administrator.ArticleDAOImpl(getDataSource());
	}

	@Bean(name = "AdminAdvertisementBean")
	public com.sliit.smartlady.service.administrator.AdvertisementDAO getAdminAdvertisementDAO()
	{
		return new com.sliit.smartlady.service.administrator.AdvertisementDAOImpl(getDataSource());
	}

	@Bean
	public com.sliit.smartlady.service.administrator.ADPaymentDAO getAdminADPaymentDAO()
	{
		return new com.sliit.smartlady.service.administrator.ADPaymentDAOImpl(getDataSource());
	}

	@Bean
	public com.sliit.smartlady.service.administrator.UserDAO getAdminLoginAuth()
	{
		return new com.sliit.smartlady.service.administrator.UserDAOImpl(getDataSource());
	}

}
