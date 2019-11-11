package lk.vsc.service.impl;

import lk.vsc.entity.Make;
import lk.vsc.entity.MakeModel;
import lk.vsc.repository.MakeModelRepository;
import lk.vsc.repository.MakeRepository;
import lk.vsc.service.MakeModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class MakeModelServiceImpl implements MakeModelService {
    @Autowired
    private MakeModelRepository makeModelRepository;

    @Autowired
    private MakeRepository makeRepository;
    @Override
    public MakeModel addMakeModel(Set<MakeModel> makeModels) {

        MakeModel m1 = null ;
        for (MakeModel s1:makeModels) {

           m1=makeModelRepository.save(s1);

        }
        return m1;
    }

    @Override
    public List<MakeModel> getModelsByMake(String modelName) {

        return makeModelRepository.getModelsByMake(modelName);


    }

    @Override
    public String searchMakeModelId(String modelName, String makelName) {
        String s = makeModelRepository.searchMakeModelId(makelName,modelName).toString();
        System.out.println("kkk"+s);
        return s;
    }

    @Override
    public Make addMake(Make make) {

        return makeRepository.save(make);

    }

    @Override
    public List<Make> getAllMakes() {
        return makeRepository.findAll();
    }
}
