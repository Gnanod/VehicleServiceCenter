package lk.vsc.repository;

import lk.vsc.entity.Employee;
import lk.vsc.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LoginRepository extends JpaRepository<Login,Integer> {


    @Query(value = "select type from Login where userName = :userName and password = :password")
    Object loginFunction(@Param("userName") String userName,@Param("password") String password);
    
    public String findPasswordByUserName( String username );
}
