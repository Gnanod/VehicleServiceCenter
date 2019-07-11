package lk.vsc.repository;


import lk.vsc.entity.Customer;
import lk.vsc.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee,Integer> {


}

