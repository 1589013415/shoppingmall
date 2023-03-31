package cn.glut.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class ServletConfig extends AbstractAnnotationConfigDispatcherServletInitializer {

    /**
     * 指定交给DispatcherServlet管理的url
     * @return
     */
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    /**
     * 指定Spring配置类
     * @return
     */
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{SpringConfig.class};
    }

    /**
     * 指定SpringMVC配置类
     * @return
     */
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMvcConfig.class};
    }

}
