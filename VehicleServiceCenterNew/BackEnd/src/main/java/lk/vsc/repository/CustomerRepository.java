package lk.vsc.repository;


import lk.vsc.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer,String> {
    
    @Query(value = "from Customer  where first_name=?1")
    List<Customer> searchByCustomerName(String customerName);

    @Query(value = "from Customer  where  nic=?1")
    Customer findCustomerDetails(String nic);
}
