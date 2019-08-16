package lk.vsc.controller;

import lk.vsc.entity.Supplier;
import lk.vsc.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        return supplierService.updateSupplier(supplier);

    }

    @GetMapping(value = "/searchBySupplierNumber/{supplierId}")
    public Supplier searchBySupplierNumber(@PathVariable int supplierId){
        return supplierService.searchBySupplierNumber(supplierId);
    }

    @GetMapping(value ="/getAllSupplier")
    public List<Supplier> getAllVehicle(){

        return supplierService.getAllSupplier();
    }



    @GetMapping(value = "/getSuppliersNames/{supplierCompany}")
    public List<Supplier> getSupplierNames(@PathVariable String supplierCompany){
        return supplierService.getSupplierNames(supplierCompany);
    }

}
