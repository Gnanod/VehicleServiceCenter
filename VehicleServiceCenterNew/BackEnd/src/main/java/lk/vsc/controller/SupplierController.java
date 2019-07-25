package lk.vsc.controller;

import lk.vsc.entity.Supplier;
import lk.vsc.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "SupplierController")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @PostMapping(value = "addSupplier")
    public Supplier addSupplier(@RequestBody Supplier supplier){

        return supplierService.addSupplier(supplier);

    }

    @DeleteMapping("/deleteSupplier/{id}")
    public void deleteSupplier(@PathVariable int id){

        supplierService.deleteSupplier(id);

    }

    @PostMapping(value = "/updateSupplier")
    public Supplier updateSupplier(@RequestBody Supplier supplier){

//        System.out.println("Nicccc"+nic);
//        Supplier  cus = supplierService.findBySupplierId(nic);
//        
//        
//        cus.setAddress(supplier.getAddress());
//        cus.setBirthday(supplier.getBirthday());
//        cus.setEmail(supplier.getEmail());
//        cus.setFirstName(supplier.getFirstName());
//        cus.setLastName(supplier.getLastName());
//        cus.setPhoneNumber(supplier.getPhoneNumber());

        return supplierService.updateSupplier(supplier);

    }

    @GetMapping(value = "/searchBySupplierNumber/{supplierId}")
    public Supplier searchBySupplierNumber(@PathVariable int supplierId){
        return supplierService.searchBySupplierNumber(supplierId);
    }



}
