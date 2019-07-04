package lk.vsc.service.impl;

import lk.vsc.entity.Customer;
import lk.vsc.repository.CustomerRepository;
import lk.vsc.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;

public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    
    
    @Override
    public Customer addCustomer(Customer customer) {
        
        return customerRepository.save(customer);
        
    }
}
