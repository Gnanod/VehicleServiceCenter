package lk.vsc.service.impl;

import lk.vsc.entity.Supplier;
import lk.vsc.repository.SupplierRepository;
import lk.vsc.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

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
    public Supplier searchBySupplierName(String supplierId) {

        return supplierRepository.searchBySupplierNumber(supplierId);
    }

    @Override
    public List<Supplier> getAllSupplier() {

        List<Object[]> companies = supplierRepository.findAllCompanies();
        
        List<Supplier> s1 = new ArrayList<>();

        for (Object s2[] :companies) {

            Supplier s3 = new Supplier();
            s3.setCompanyName(s2[0].toString());
            s1.add(s3);
        }
        return s1;

    }

    @Override
    public List<Supplier> getSupplierNames(String supplierCompany) {

        List<Object[]> suppliers =  supplierRepository.getSupplierNames(supplierCompany);

        List<Supplier> s1 = new ArrayList<>();

        for (Object s2[] :suppliers) {

            Supplier s3 = new Supplier();
            s3.setCompanyName(s2[0].toString());
            s1.add(s3);

        }
        return s1;
    }


}