package lk.vsc.service;

import lk.vsc.entity.Supplier;

public interface SupplierService {
    Supplier addSupplier(Supplier supplier);
    void deleteSupplier(int supplier);
    Supplier updateSupplier(Supplier supplier);
    Supplier searchBySupplierNumber(int supplierId);
}
