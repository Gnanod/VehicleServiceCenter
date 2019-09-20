package lk.vsc.service;

import lk.vsc.entity.Employee;
import lk.vsc.entity.Login;
import lk.vsc.entity.Vehicle;

public interface LoginService {
    

    String loginFunction(String nic, String password);

    Login addLoginDetails(Login login);
}
