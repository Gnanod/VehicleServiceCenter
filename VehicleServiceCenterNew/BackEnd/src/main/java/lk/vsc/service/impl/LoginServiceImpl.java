package lk.vsc.service.impl;

import lk.vsc.entity.Employee;
import lk.vsc.entity.Login;
import lk.vsc.entity.Vehicle;
import lk.vsc.repository.LoginRepository;
import lk.vsc.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
    
    @Autowired
    private LoginRepository loginRepository;
    
    


    @Override
    public String loginFunction(String nic, String password) {

        Object error = loginRepository.loginFunction(nic,password);

        String type = error.toString();

        if(type.equals("Admin")){

            return "1";

        }else if(type.equals("Cashier")){

            return "2";

        }else{

            return null;

        }

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
