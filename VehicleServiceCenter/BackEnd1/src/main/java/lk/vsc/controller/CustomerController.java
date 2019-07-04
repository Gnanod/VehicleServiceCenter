package lk.vsc.controller;



import lk.vsc.entity.Customer;
import lk.vsc.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/CustomerController")
public class CustomerController {
    
    
    @Autowired
    private CustomerService customerService;
    
    @PostMapping(value = "/addCustomer")
    public Customer addCustomer(@RequestBody Customer customer){

       
        return customerService.addCustomer(customer);
        
    }
}
