package lk.vsc.service.impl;

import lk.vsc.DTO.UpdateJobPrice;
import lk.vsc.entity.JobOrder;
import lk.vsc.entity.Supplier;
import lk.vsc.repository.JobOrderRepository;
import lk.vsc.repository.SupplierRepository;
import lk.vsc.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService{

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private JobOrderRepository jobOrder;

    @Override
    public Supplier addSupplier(Supplier supplier) {

        return supplierRepository.save(supplier);
    }

    @Override
    public void deleteSupplier(int supplier) {
        supplierRepository.deleteById(supplier);
    }

    @Override
    public Supplier updateSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    @Override
    public List<Supplier> searchBySupplierName(String supplierId) {

        return supplierRepository.searchBySupplierNumber(supplierId);
    }

    @Override
    public List<Supplier> getAllSupplier() {

        List<Object[]> companies = supplierRepository.findAllCompanies();
        
        List<Supplier> s1 = new ArrayList<>();

        if(companies.size()!=0){
            for (Object s2[] :companies) {

                Supplier s3 = new Supplier();
                s3.setCompanyName(s2[0].toString());
                s1.add(s3);
            }
        }else{
            System.out.println( "GGGGGGGGG"+companies);
        }

        return s1;

    }

    @Override
    public List<Supplier> getSupplierNames(String supplierCompany) {

        List<Object[]> suppliers =  supplierRepository.getSupplierNames(supplierCompany);

        List<Supplier> s1 = new ArrayList<>();

        for (Object s2[] :suppliers) {

            Supplier s3 = new Supplier();
            s3.setAgentName(s2[0].toString());
            s3.setSupplierId(Integer.parseInt(s2[1].toString()));

            s1.add(s3);

        }
        return s1;
    }

    @Override
    public UpdateJobPrice searchServiceDetailsByNumber(String serviceId) {
        List<Object[]> s2 = supplierRepository.searchServiceDetailsByNumber(serviceId);


        if(s2!=null){
            UpdateJobPrice j1=null;
            for (Object s[] :s2) {
                j1= new UpdateJobPrice();
                j1.setVehicleNumber(s[0].toString());
                j1.setService_id(serviceId);
                j1.setDate(s[2].toString());
                j1.setGrossAmount(Double.parseDouble(s[3].toString()));
                j1.setPaymentType(s[4].toString());
                j1.setCreditBalance(Double.parseDouble(s[5].toString()));

            }
            return j1;
        }else{

            return null;
        }

    }

    @Override
    public String updateSupplierPayments(UpdateJobPrice u) {

        JobOrder j1 = jobOrder .getJobOrder(u.getService_id());
        JobOrder j2 = j1;
        j2.setCreditBalance(u.getCreditBalance());
        j2.setDate(u.getDate());
        j2.setGrossAmount(u.getGrossAmount());
        j2.setPaidAmount(u.getPayAmount());
        j2.setPaymentType("Full");
        JobOrder s3 = jobOrder.save(j2);
        if(s3!=null){
            return "0";
        }else{
            return null;
        }

    }


}