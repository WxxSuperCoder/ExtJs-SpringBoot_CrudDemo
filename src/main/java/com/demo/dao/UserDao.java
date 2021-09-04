package com.demo.dao;

import com.demo.domain.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserDao {
    List<User> getAll();

    Integer add(User user);

    Integer delete(Integer id);

    Integer modify(User user);

    List<User> getByName(String name);

    User getById(String id);

}
