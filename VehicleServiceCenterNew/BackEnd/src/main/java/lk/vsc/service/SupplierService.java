package lk.vsc.service;

import lk.vsc.DTO.UpdateJobPrice;
import lk.vsc.entity.Supplier;

import java.util.List;

public interface SupplierService {

    Supplier addSupplier(Supplier supplier);
    void deleteSupplier(int supplier);
    Supplier updateSupplier(Supplier supplier);
    Supplier searchBySupplierName(String searchSupplierName);
    List<Supplier> getAllSupplier();
    List<Supplier> getSupplierNames(String supplierCompany);
    UpdateJobPrice searchServiceDetailsByNumber(String serviceId);
    String updateSupplierPayments(UpdateJobPrice u);
}
