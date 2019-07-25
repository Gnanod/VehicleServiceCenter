package lk.vsc.service.impl;

import lk.vsc.entity.Customer;
import lk.vsc.repository.CustomerRepository;
import lk.vsc.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    
    
    @Override
    public Customer addCustomer(Customer customer) {
        
        return customerRepository.save(customer);
        
    }

    @Override
    public List<Customer> getAllCustomers() {
        
        return customerRepository.findAll();
    }

    @Override
    public Customer searchByCustomerName(String name) {
        
        return customerRepository.searchByCustomerName(name);
        
    }

    @Override
    public void deleteCustomer(String nic) {
        
       customerRepository.deleteById(nic);
    }

    @Override
    public Customer updateCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer findByCustomerId(String nic) {
        return customerRepository.findCustomerDetails(nic);
    }
}
