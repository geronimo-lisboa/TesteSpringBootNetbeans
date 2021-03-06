/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.geronimo.don.testeNetbeans;

import com.geronimo.don.testeNetbeans.datasources.MasterRepository;
import com.geronimo.don.testeNetbeans.entities.Master;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;


@RestController
public class TesteRest {
    @Autowired
    private MasterRepository masterRepo;
    @RequestMapping(path="/masters", method=PUT)
    public Master putMaster(@RequestBody Master aMaster){
        masterRepo.save(aMaster);
        return aMaster;
    }
    
    @RequestMapping(path = "/masters" , method = GET)
    public Iterable<Master> getAllMasters(){
        Iterable<Master> lst =  masterRepo.findAll();
        return lst;
    }
    @RequestMapping(path="/newMaster",  method = POST)
    public Master createNewMaster(@RequestBody Master input) {
        input = masterRepo.save(input);
        return input;
    }
    //Somente o id importa e é com ele que eu excluo o master
    @RequestMapping(path="/deleteMaster", method=DELETE)
    public Master deleteMaster(@RequestBody Master input){
        masterRepo.delete(input.getId());
        return null;
    }
    
    @RequestMapping(path = "/teste", method = GET)
    public List<String> list() {
        List<String> foo = new ArrayList<>();
        foo.add("a");
        foo.add("b");
        return foo;
    }
        
}
