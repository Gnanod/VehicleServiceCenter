package lk.vsc.service.impl;

import lk.vsc.entity.PerformaInvoice;
import lk.vsc.repository.PerformaInvoiceRepository;
import lk.vsc.service.PerformaInvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PerformaInvoiceServiceImpl implements PerformaInvoiceService {

    @Autowired
    private PerformaInvoiceRepository performaInvoiceRepository;
    @Override
    public String getResult() {
        Object lastId =performaInvoiceRepository.getLastId();

        if(lastId!=null){
            System.out.println("Last Id"+lastId.toString());
            return lastId.toString();
        }else{
            return null;
        }
    }

    @Override
    public void addPerformaInvoice(PerformaInvoice i) {
        performaInvoiceRepository.save(i);
    }
}
