package lk.vsc.controller;



import lk.vsc.entity.MakeModel;
import lk.vsc.service.MakeModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping(value = "/MakeModelController")
public class MakeModelController {


    @Autowired
    private MakeModelService makeModelService;

    @PostMapping(value = "/addMakeModel")
    public MakeModel addMakeModel(@RequestBody Set<MakeModel> makeModels){


        return  makeModelService.addMakeModel(makeModels);

    }

    @GetMapping(value = "/addMakeModel/{modelName}")
    public List<MakeModel> getModelsByMake(@PathVariable String modelName){
        System.out.println("GGGGG"+modelName);
        List<MakeModel>l1= makeModelService.getModelsByMake(modelName);
        return l1;

    }


    @GetMapping(value = "/searchMakeModelId/{makeName}/{modelName}")
    public String searchMakeModelId(@PathVariable String modelName,@PathVariable String  makeName){

       return makeModelService.searchMakeModelId(modelName,makeName);


    }

}
