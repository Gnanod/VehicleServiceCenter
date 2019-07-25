package lk.vsc.repository;

import lk.vsc.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LoginRepository extends JpaRepository<Employee,Integer> {

    @Query(value = "select nic from Employee where nic = :userNic and password = :userPassword")
    Object loginFunction(@Param("userNic") String userNic,@Param("userPassword") String userPassword);
    
    
}
