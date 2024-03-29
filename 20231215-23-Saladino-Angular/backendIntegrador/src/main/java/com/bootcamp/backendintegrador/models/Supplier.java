package com.bootcamp.backendintegrador.models;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Email;

@Entity
@Table(name = "providers")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Supplier code is required")
    @NotBlank(message = "Supplier code must be complete")
    @Column(unique = true, name = "supplier_code", nullable = false)
    private String supplierCode;

    @NotNull(message = "Business name is required")
    @NotBlank(message = "Business name must be complete")
    @Column(name = "business_name", nullable = false)
    private String businessName;

    @NotNull(message = "Email is required")
    @NotBlank(message = "Email must be complete")
    @Email(message = "Email must be valid")
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull(message = "Website is required")
    @NotBlank(message = "Website must be complete")
    @Lob
    @Column(name = "website", nullable = false, columnDefinition = "TEXT")
    private String website;

    @NotNull(message = "Phone number is required")
    @NotBlank(message = "Phone number must be complete")
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @NotNull(message = "Image is required")
    @NotBlank(message = "Image must be complete")
    @Lob
    @Column(name = "image", nullable = false, columnDefinition = "TEXT")
    private String image;

    @NotNull(message = "Active is required")
    @Column(name = "active", nullable = false)
    private Boolean active;

    @NotNull(message = "CUIT is required")
    @NotBlank(message = "CUIT must be complete")
    @Column(name = "cuit", nullable = false)
    @Pattern(regexp = "^\\d{2}-\\d{8}-\\d{1}$")
    private String cuit;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;
    
    @ManyToOne
    @JoinColumn(name = "industry_id", referencedColumnName = "id")
    private Industry industry;

    @ManyToOne
    @JoinColumn(name = "iva_condition_id", referencedColumnName = "id")
    private IvaCondition ivaCondition;
    
    public Supplier() {

    }

    public Supplier(Integer id,
            String supplierCode,
            String businessName,
            Industry industry,
            String email,
            String website,
            String phoneNumber,
            String image,
            Boolean active,
            String cuit,
            IvaCondition ivaCondition,
            Timestamp createdAt, Timestamp updatedAt) {
        this.id = id;
        this.supplierCode = supplierCode;
        this.businessName = businessName;
        this.industry = industry;
        this.email = email;
        this.website = website;
        this.phoneNumber = phoneNumber;
        this.image = image;
        this.active = active;
        this.cuit = cuit;
        this.ivaCondition = ivaCondition;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSupplierCode() {
        return supplierCode;
    }

    public void setSupplierCode(String supplierCode) {
        this.supplierCode = supplierCode;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public Industry getIndustry() {
        return industry;
    }

    public void setIndustry(Industry industry) {
        this.industry = industry;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getCuit() {
        return cuit;
    }

    public void setCuit(String cuit) {
        this.cuit = cuit;
    }

    public IvaCondition getIvaCondition() {
        return ivaCondition;
    }

    public void setIvaCondition(IvaCondition ivaCondition) {
        this.ivaCondition = ivaCondition;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
