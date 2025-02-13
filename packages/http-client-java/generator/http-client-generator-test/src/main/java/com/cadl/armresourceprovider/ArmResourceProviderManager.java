// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package com.cadl.armresourceprovider;

import com.azure.core.credential.TokenCredential;
import com.azure.core.http.HttpPipeline;
import com.azure.core.management.profile.AzureProfile;
import com.cadl.armresourceprovider.fluent.ArmResourceProviderClient;
import com.cadl.armresourceprovider.implementation.ArmResourceProviderClientBuilder;
import com.cadl.armresourceprovider.implementation.ChildExtensionResourceInterfacesImpl;
import com.cadl.armresourceprovider.implementation.ChildResourcesInterfacesImpl;
import com.cadl.armresourceprovider.implementation.CustomTemplateResourceInterfacesImpl;
import com.cadl.armresourceprovider.implementation.OperationsImpl;
import com.cadl.armresourceprovider.implementation.TopLevelArmResourceInterfacesImpl;
import com.cadl.armresourceprovider.models.ChildExtensionResourceInterfaces;
import com.cadl.armresourceprovider.models.ChildResourcesInterfaces;
import com.cadl.armresourceprovider.models.CustomTemplateResourceInterfaces;
import com.cadl.armresourceprovider.models.Operations;
import com.cadl.armresourceprovider.models.TopLevelArmResourceInterfaces;
import java.time.Duration;
import java.util.Objects;

/**
 * Entry point to ArmResourceProviderManager.
 * Arm Resource Provider management API.
 */
public final class ArmResourceProviderManager {
    private ChildResourcesInterfaces childResourcesInterfaces;

    private TopLevelArmResourceInterfaces topLevelArmResourceInterfaces;

    private CustomTemplateResourceInterfaces customTemplateResourceInterfaces;

    private Operations operations;

    private ChildExtensionResourceInterfaces childExtensionResourceInterfaces;

    private final ArmResourceProviderClient clientObject;

    private ArmResourceProviderManager(HttpPipeline httpPipeline, AzureProfile profile, Duration defaultPollInterval) {
        Objects.requireNonNull(httpPipeline, "'httpPipeline' cannot be null.");
        Objects.requireNonNull(profile, "'profile' cannot be null.");
        this.clientObject = new ArmResourceProviderClientBuilder().pipeline(httpPipeline)
            .endpoint(profile.getEnvironment().getResourceManagerEndpoint())
            .subscriptionId(profile.getSubscriptionId())
            .defaultPollInterval(defaultPollInterval)
            .buildClient();
    }

    /**
     * Creates an instance of ArmResourceProvider service API entry point.
     * 
     * @param credential the credential to use.
     * @param profile the Azure profile for client.
     * @return the ArmResourceProvider service API instance.
     */
    public static ArmResourceProviderManager authenticate(TokenCredential credential, AzureProfile profile) {
        Objects.requireNonNull(credential, "'credential' cannot be null.");
        Objects.requireNonNull(profile, "'profile' cannot be null.");
        return configure().authenticate(credential, profile);
    }

    /**
     * Creates an instance of ArmResourceProvider service API entry point.
     * 
     * @param httpPipeline the {@link HttpPipeline} configured with Azure authentication credential.
     * @param profile the Azure profile for client.
     * @return the ArmResourceProvider service API instance.
     */
    public static ArmResourceProviderManager authenticate(HttpPipeline httpPipeline, AzureProfile profile) {
        Objects.requireNonNull(httpPipeline, "'httpPipeline' cannot be null.");
        Objects.requireNonNull(profile, "'profile' cannot be null.");
        return new ArmResourceProviderManager(httpPipeline, profile, null);
    }

    /**
     * Gets a Configurable instance that can be used to create ArmResourceProviderManager with optional configuration.
     * 
     * @return the Configurable instance allowing configurations.
     */
    public static Configurable configure() {
        return new ArmResourceProviderManager.Configurable();
    }

    /**
     * Gets the resource collection API of ChildResourcesInterfaces. It manages ChildResource.
     * 
     * @return Resource collection API of ChildResourcesInterfaces.
     */
    public ChildResourcesInterfaces childResourcesInterfaces() {
        if (this.childResourcesInterfaces == null) {
            this.childResourcesInterfaces
                = new ChildResourcesInterfacesImpl(clientObject.getChildResourcesInterfaces(), this);
        }
        return childResourcesInterfaces;
    }

    /**
     * Gets the resource collection API of TopLevelArmResourceInterfaces. It manages TopLevelArmResource.
     * 
     * @return Resource collection API of TopLevelArmResourceInterfaces.
     */
    public TopLevelArmResourceInterfaces topLevelArmResourceInterfaces() {
        if (this.topLevelArmResourceInterfaces == null) {
            this.topLevelArmResourceInterfaces
                = new TopLevelArmResourceInterfacesImpl(clientObject.getTopLevelArmResourceInterfaces(), this);
        }
        return topLevelArmResourceInterfaces;
    }

    /**
     * Gets the resource collection API of CustomTemplateResourceInterfaces. It manages CustomTemplateResource.
     * 
     * @return Resource collection API of CustomTemplateResourceInterfaces.
     */
    public CustomTemplateResourceInterfaces customTemplateResourceInterfaces() {
        if (this.customTemplateResourceInterfaces == null) {
            this.customTemplateResourceInterfaces
                = new CustomTemplateResourceInterfacesImpl(clientObject.getCustomTemplateResourceInterfaces(), this);
        }
        return customTemplateResourceInterfaces;
    }

    /**
     * Gets the resource collection API of Operations.
     * 
     * @return Resource collection API of Operations.
     */
    public Operations operations() {
        if (this.operations == null) {
            this.operations = new OperationsImpl(clientObject.getOperations(), this);
        }
        return operations;
    }

    /**
     * Gets the resource collection API of ChildExtensionResourceInterfaces. It manages ChildExtensionResource.
     * 
     * @return Resource collection API of ChildExtensionResourceInterfaces.
     */
    public ChildExtensionResourceInterfaces childExtensionResourceInterfaces() {
        if (this.childExtensionResourceInterfaces == null) {
            this.childExtensionResourceInterfaces
                = new ChildExtensionResourceInterfacesImpl(clientObject.getChildExtensionResourceInterfaces(), this);
        }
        return childExtensionResourceInterfaces;
    }

    /**
     * Gets wrapped service client ArmResourceProviderClient providing direct access to the underlying auto-generated
     * API implementation, based on Azure REST API.
     * 
     * @return Wrapped service client ArmResourceProviderClient.
     */
    public ArmResourceProviderClient serviceClient() {
        return this.clientObject;
    }
}
