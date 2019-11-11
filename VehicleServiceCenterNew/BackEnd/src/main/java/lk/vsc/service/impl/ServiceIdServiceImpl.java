package lk.vsc.service.impl;

import lk.vsc.repository.ServiceIdReository;
import lk.vsc.service.ServiceIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceIdServiceImpl implements ServiceIdService {

    @Autowired
    private ServiceIdReository idRepository;

    @Override
    public String getResult() {
        Object lastId =idRepository.getLastId();
//        System.out.println("lastId "+idRepository.getLastId());
//        System.out.println("lastId Null"+idRepository.getLastId().toString());
        if(lastId!=null){
            return lastId.toString();
        }else{
            return null;
        }
    }
}
