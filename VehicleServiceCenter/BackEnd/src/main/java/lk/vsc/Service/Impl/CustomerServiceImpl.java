package lk.vsc.Service.Impl;

import lk.vsc.Entity.Customer;
import lk.vsc.Repository.CustomerRepository;
import lk.vsc.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Override
    public Customer addCustomer(Customer customer) {
        
        return customerRepository.save(customer);
        
    }
}
