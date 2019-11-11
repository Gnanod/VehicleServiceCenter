package lk.vsc.controller;


import lk.vsc.entity.Make;
import lk.vsc.entity.MakeModel;
import lk.vsc.service.MakeModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/AddMakeController")
public class AddMakeController {

    @Autowired
    private MakeModelService makeModelService;

    @PostMapping(value = "addMakeModel")
    public Make addMakeModel(@RequestBody Make make){

      return  makeModelService.addMake(make);
      
    }

    @GetMapping(value ="/getAllMakes")
    public List<Make> getAllMakes(){

        return makeModelService.getAllMakes();
    }

}
