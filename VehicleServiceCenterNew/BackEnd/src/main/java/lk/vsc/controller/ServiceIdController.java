package lk.vsc.controller;

import lk.vsc.entity.ServiceJob;
import lk.vsc.service.ServiceIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.NumberFormat;

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

            String subid = lastId.substring(1);
            int id = Integer.parseInt(subid);
            id++;
            NumberFormat numberFormat = NumberFormat.getIntegerInstance();
            numberFormat.setMinimumIntegerDigits(9);
            numberFormat.setGroupingUsed(false);
            String newID = "S"+numberFormat.format(id);

            s1.setServiceJobId(newID);
            //return newID;

        } else {

            s1.setServiceJobId("S0000000001");


        }

        return s1;

    }

}
