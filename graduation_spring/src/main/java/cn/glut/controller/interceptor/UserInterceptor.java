package cn.glut.controller.interceptor;

import cn.glut.pojo.ResultMsg;
import cn.glut.util.JwtRedisUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@Component
public class UserInterceptor implements HandlerInterceptor {
    @Autowired
    JwtRedisUtil jwtRedisUtil;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("token");
        if(jwtRedisUtil.isExistToken(token)){
            System.out.println("UserInterceptor.class：有效验证码");
            return true;
        }else {
            ResultMsg resultMsg = new ResultMsg(0,"interceptor:无效toekn",false,null);
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonString = objectMapper.writeValueAsString(resultMsg);
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            response.getWriter().write(jsonString);
            System.out.println("UserInterceptor.class：无效验证码");
            return false;
        }
    }
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
