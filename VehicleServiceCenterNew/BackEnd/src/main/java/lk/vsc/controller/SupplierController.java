package lk.vsc.controller;

import lk.vsc.DTO.UpdateJobPrice;
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



    @GetMapping(value = "/searchBySupplierName/{searchSupplierName}")
    public List<Supplier> searchBySupplierNumber(@PathVariable String searchSupplierName){
        return supplierService.searchBySupplierName(searchSupplierName);
    }

    @GetMapping(value ="/getAllSupplier")
    public List<Supplier> getAllVehicle(){

        return supplierService.getAllSupplier();
    }



    @GetMapping(value = "/getSuppliersNames/{supplierCompany}")
    public List<Supplier> getSupplierNames(@PathVariable String supplierCompany){
        return supplierService.getSupplierNames(supplierCompany);
    }

    @PostMapping(value = "/updateSupplier")
    public Supplier updateSupplier(@RequestBody Supplier supplier){

        return supplierService.updateSupplier(supplier);

    }

    @GetMapping(value ="/searchServiceDetailsByNumber/{serviceId}")
    public UpdateJobPrice searchServiceDetailsByNumber(@PathVariable String serviceId){

        return supplierService.searchServiceDetailsByNumber(serviceId);
    }

    @PostMapping(value = "updateSupplierPayments")
    public String updateSupplierPayments(@RequestBody UpdateJobPrice u){

        return supplierService.updateSupplierPayments(u);

    }

}
