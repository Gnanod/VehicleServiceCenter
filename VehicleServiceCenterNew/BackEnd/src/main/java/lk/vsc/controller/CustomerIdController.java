package lk.vsc.controller;


import lk.vsc.entity.Customer;
import lk.vsc.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@CrossOrigin
@RestController
@RequestMapping(value = "/CustomerIdController")
public class CustomerIdController {

    @Autowired
    private CustomerService customerService;

    @GetMapping(value = "/getLastID")
    public Customer getLastID(){

        String lastId = customerService.getResult();
        Customer s1 = new Customer();
        if (lastId != null) {

            String subid = lastId.substring(1);
            int id = Integer.parseInt(subid);
            id++;
            NumberFormat numberFormat = NumberFormat.getIntegerInstance();
            numberFormat.setMinimumIntegerDigits(4);
            numberFormat.setGroupingUsed(false);
            String newID = "C"+numberFormat.format(id);

            s1.setNic(newID);
            //return newID;

        } else {

            s1.setNic("C0001");


        }

        return s1;

    }

    public static String getCurrentYear() {

        DateFormat dateFormat = new SimpleDateFormat("yyyy");
        Date date = new Date();
        String newDate = dateFormat.format(date);
        return newDate;
    }
}
