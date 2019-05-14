package com.example.wbdvsu119serverjava.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomePageController {
	
	@RequestMapping({"/"})
	public String homePage() {
		return "forward:/course/course-list.template.client.html";
	}
}
