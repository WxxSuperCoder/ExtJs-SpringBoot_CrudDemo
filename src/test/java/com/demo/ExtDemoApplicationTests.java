package com.demo;

import com.demo.dao.UserDao;
import com.demo.domain.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ExtDemoApplicationTests {
    @Autowired
    UserDao userDao;
    @Test
    void contextLoads() {

    }

}
