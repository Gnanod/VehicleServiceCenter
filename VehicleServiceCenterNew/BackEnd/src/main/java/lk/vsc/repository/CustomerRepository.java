package lk.vsc.repository;


import lk.vsc.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer,String> {
    
    @Query(value = "from Customer  where first_name=?1")
    Customer searchByCustomerName(String customerName);

    @Query(value = "from Customer  where  nic=?1")
    Customer findCustomerDetails(String nic);
}
