package lk.vsc.controller;

import lk.vsc.entity.Employee;
import lk.vsc.entity.Login;
import lk.vsc.entity.Vehicle;
import lk.vsc.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/LoginController")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping(value = "/addLogin")
    public Login addLoginDetails(@RequestBody Login login){

        return loginService.addLoginDetails(login);

    }


    
    @GetMapping(value = "/Login/{nic}/{password}")
    public String Login(@PathVariable String nic,@PathVariable String password){
        Employee emp = new Employee();
        System.out.println("GGGGGGGGGGGGGGG");
        return loginService.loginFunction(nic,password);

    }
}
