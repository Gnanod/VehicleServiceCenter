package lk.vsc.service;

import lk.vsc.entity.MakeModel;

import java.util.List;
import java.util.Set;

public interface MakeModelService {
    MakeModel addMakeModel(Set<MakeModel> makeModels);

    List<MakeModel> getModelsByMake(String modelName);

    String searchMakeModelId(String modelName, String makelName);
}
