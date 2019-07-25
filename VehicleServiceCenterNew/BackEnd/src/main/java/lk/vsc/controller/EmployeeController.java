package lk.vsc.controller;

import lk.vsc.entity.Employee;
import lk.vsc.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "EmployeeController")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping(value = "addEmployee")
    public Employee addEmployee(@RequestBody Employee employee){

        return employeeService.addEmployee(employee);

    }

    @DeleteMapping("/deleteEmployee/{id}")
    public void deleteEmployee(@PathVariable int id){

         employeeService.deleteEmployee(id);

    }

    @PostMapping(value = "/updateEmployee")
    public Employee updateEmployee(@RequestBody Employee employee){

//        System.out.println("Nicccc"+nic);
//        Employee  cus = employeeService.findByEmployeeId(nic);
//        
//        
//        cus.setAddress(employee.getAddress());
//        cus.setBirthday(employee.getBirthday());
//        cus.setEmail(employee.getEmail());
//        cus.setFirstName(employee.getFirstName());
//        cus.setLastName(employee.getLastName());
//        cus.setPhoneNumber(employee.getPhoneNumber());

        return employeeService.updateEmployee(employee);

    }

    @GetMapping(value = "/searchByEmployeeNumber/{employeeId}")
    public Employee searchByEmployeeNumber(@PathVariable int employeeId){
        return employeeService.searchByEmployeeNumber(employeeId);
    }



}
