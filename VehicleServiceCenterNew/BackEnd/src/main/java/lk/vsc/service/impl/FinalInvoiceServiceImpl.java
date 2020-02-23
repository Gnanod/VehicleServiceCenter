package lk.vsc.service.impl;

import lk.vsc.entity.FinalInvoice;
import lk.vsc.repository.FinalInvoiceRepository;
import lk.vsc.service.FinalInvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class FinalInvoiceServiceImpl implements FinalInvoiceService{

    @Autowired
    private FinalInvoiceRepository finalInvoiceRepository;


    @Override
    @Transactional
    public String addFinalInvoice(FinalInvoice invoice) {
       FinalInvoice status=  finalInvoiceRepository.save(invoice);
       if(status!=null){
           return "0";
       }else{
           return null;
       }

    }
}
