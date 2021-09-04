package com.demo.web;

import com.demo.dao.UserDao;
import com.demo.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ExtController {
    @Autowired
    UserDao userDao;

    @RequestMapping("/")
    public String index(String name, Model model) {
        if (name != null && name != "") {
            //根据姓名字段搜索
            model.addAttribute("data", userDao.getByName(name));
        } else {
            model.addAttribute("data", userDao.getAll());
        }
        return "index";
    }

    @ResponseBody
    @RequestMapping("/findAll")
    public List<User> findAll(String name) {
        System.out.println(name);
        return userDao.getAll();
    }

    @RequestMapping("/delete")
    public String delete(Integer id) {
        Integer res = userDao.delete(id);
        if (res > 0) {
            return "redirect:/"; //刷新页面
        } else {
            return "error";
        }
    }

    @RequestMapping("/add")
    public String add(User user) {
        Integer res = userDao.add(user);
        return "redirect:/";
    }

    @RequestMapping("/modify")
    public String modify(User user) {
        Integer res = userDao.modify(user);
        return "redirect:/";
    }

    @RequestMapping("/getById")
    @ResponseBody
    public User getById(String id) {
        return userDao.getById(id);
    }
}
