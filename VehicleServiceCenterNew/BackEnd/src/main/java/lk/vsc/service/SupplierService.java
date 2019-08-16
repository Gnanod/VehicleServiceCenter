package lk.vsc.service;

import lk.vsc.entity.Supplier;

import java.util.List;

public interface SupplierService {

    Supplier addSupplier(Supplier supplier);
    void deleteSupplier(int supplier);
    Supplier updateSupplier(Supplier supplier);
    Supplier searchBySupplierNumber(int supplierId);
    List<Supplier> getAllSupplier();
    List<Supplier> getSupplierNames(String supplierCompany);

}
