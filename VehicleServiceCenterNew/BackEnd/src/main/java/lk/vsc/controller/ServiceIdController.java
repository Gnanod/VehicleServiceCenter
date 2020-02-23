package lk.vsc.controller;

import lk.vsc.entity.ServiceJob;
import lk.vsc.service.ServiceIdService;
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
@RequestMapping(value = "/ServiceIdController")
public class ServiceIdController {


    @Autowired
    private ServiceIdService idService;

    @GetMapping(value = "/getLastID")
    public ServiceJob getLastID(){

        String lastId = idService.getResult();
        ServiceJob s1 = new ServiceJob();
        if (lastId != null) {

            String subid = lastId.substring(5);
            System.out.println("subId"+subid);
            int id = Integer.parseInt(subid);
            System.out.println("ID"+id);
            id++;
            System.out.println("plus Id"+id);
            NumberFormat numberFormat = NumberFormat.getIntegerInstance();
            numberFormat.setMinimumIntegerDigits(4);
            numberFormat.setGroupingUsed(false);
            String newID = "S"+getCurrentYear()+numberFormat.format(id);
            System.out.println("new Id"+newID);
            s1.setServiceJobId(newID);
            //return newID;

        } else {

            s1.setServiceJobId("S"+getCurrentYear()+"0001");


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
