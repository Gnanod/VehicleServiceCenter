package lk.vsc.service.impl;

import lk.vsc.entity.Employee;
import lk.vsc.entity.Vehicle;
import lk.vsc.repository.LoginRepository;
import lk.vsc.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
    
    @Autowired
    private LoginRepository loginRepository;
    
    
//    @Override
//    public String loginFunction(Employee emp) {
//        
//        String userNic = emp.getNic();
//        String userPassword = emp.getPassword();
//        System.out.println("UserNic"+userNic);
//        System.out.println("UserPassword"+userPassword);
//        Object error = loginRepository.loginFunction(userNic,userPassword);
//      
//       // System.out.println("LOgin Name"+error.getAddress());
//        if(error!=null){
//            System.out.println("JJJJJJJJJJJ");
//            return "LoginSuccess";
//            
//        }else {
//            return null;
//        }
//        
//    }

    @Override
    public String loginFunction(String nic, String password) {

        System.out.println("UserNic"+nic);
       System.out.println("UserPassword"+password);
        Object error = loginRepository.loginFunction(nic,password);
        
        if(error!=null){

            System.out.println("ErrorObjectNotNull "+error);
            System.out.println("ErrorObjectNotNull "+error.toString());
            return "951960055";

        }else {

            System.out.println("ErrorObject "+error);
           // System.out.println("ErrorObject "+error.toString());
            return null;
            
        }
    }
}
