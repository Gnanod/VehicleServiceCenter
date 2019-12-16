package lk.vsc.service.impl;

import lk.vsc.entity.Login;
import lk.vsc.repository.LoginRepository;
import lk.vsc.service.LoginService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class LoginServiceImpl implements LoginService {
    
    @Autowired
    private LoginRepository loginRepository;
    
    


    @Override
    public String loginFunction(String nic, String password) {

        Object error = loginRepository.loginFunction(nic, password);
        String retString =null;
        if (error != null) {
            if (error.toString().equals("Admin")) {

                retString= "1";

            }
            if (error.toString().equals("Cashier")) {

                retString ="2";

            }
        } else {
        	
        	List<Login> loginList = new ArrayList<Login>(); 
        	loginList = loginRepository.findAll();
        	
        	if( loginList.size() == 0 ) {
        		
        		Login login = new Login();
        		
        		login.setUserName("admin");
        		login.setPassword("admin@turismo");
        		login.setType("Admin");
        		
        		loginRepository.save(login);
        		
        		retString = "1";
        	}else {
        	    retString = "3";
                System.out.println("HHHHH");
        	}
        }

        return retString;
//        if(error!=null){
//
//            System.out.println("ErrorObjectNotNull "+error);
//            System.out.println("ErrorObjectNotNull "+error.toString());
//            return "9";
//
//        }else{
//
//            System.out.println("ErrorObject "+error);
//           // System.out.println("ErrorObject "+error.toString());
//            return null;
//
//        }
    }

    @Override
    public Login addLoginDetails(Login login) {

        return loginRepository.save(login);

    }
}
