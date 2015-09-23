The agenda for the 1st ITEA review [**9:00 - 12:30**]:
-------

1. **Introduction** (10 min): [**09:00 - 09:10**]
  - Brief introduction of the main attendees by Project Leader
  - The schedule of the day
  - Review Chairman Introductory Speech, summarizing the main expectations and targets of the review.
2. **Overview of the project** (15 min): [**09:00 - 09:15**] - Ferhat
  - The consortium structure
  - Project industrialization triangle
  - Key Contributions
    - Knowledge Capture
    - Knowledge extraction
    - Consistency & Completeness Checking
  - Technological Components & interactions
  - Conceptual Architecture
  - Work packages & Technical Innovations
  - Overall Progress of first year in nutshell
  - Workshops & Meetings
  - International Collaboration in the consortium
  - Open Source Campaign
  - Overview of Industrial Use Cases

3.  **Use-cases and exploitation prospects** (5 min each => 45min):  [**09:15 - 10:00**]
    - France
      - UC-FR-01: Synchronization between Models and Documentation (OBEO) - Yvan
      - UC-FR-02: Enterprise Architecture (OBEO) - Yvan
      - UC-FR-03: Synchronization of regulation documentation with a design rule repository(AIRBUS) - Anne
      - UC-FR-04: Production of a context specific design document (AIRBUS) - Anne
    - Turkey
      - UC-TR-01: Production of a proposal in response to an IPA Invitation To Tender (HISBIM) - Ersan
      - UC-TR-02: Collaborative production of a proposal for an IPA project (HISBIM) - Ersan
      - UC-TR-03: Synchronization of ReqIF models from requirement specifications (UNIT) - Ferhat
      - UC-TR-04: Integration with Application Lifecycle Management (ALM) Tools (HAVELSAN) - Eray
      - UC-TR-05: Synchronous Business Process Design with Use Cases (KOCSISTEM) - Geylani
            - Use case document to BPMN model transformation (Std screenshot of the corpora doc)
            - (Planned) BPMN model transformation to Use case document (screenshot of the corpora model)
            - Doc model
            - Next step: using technique documents of Ford-Otosan;
    - Belgium
      - UC-BE-01: Requirements IT (SOGETI)
      - UC-BE-02: Automated test generation (SOGETI)

4. **Progress Status per WP** (60min):  [**10:00 - 11:00**]
    - WP1: Industrial Use Cases and Requirements (AIRBUS) - Anne
        - Software requirements
        - User requirements
    - WP2: Semantic Parsing and Generation of Documents and Documents Components (LORIA, Claire)
    - WP3: Model to/from Knowledge Base Transformation (UNIT) - Ferhat
          - D3.2.1 M2M Transformation Framework architectural design document
                     - Big picture
                     - D3.2.1 Section 3. Design of The M2M Transformation
    - WP4: Knowledge Base Design and Implementation (MANTIS) - Erhan
          - D4.1.1 - Section 2. Definition of knowledge base and sample elements
    - WP5: Project Management (UNIT) - Ferhat
        - Source Code Management: Github
        - Document Management: Goodle doc and Gitahub
        - Project Controls
        - Collaboration Management
        - Workshops: List of
    - WP6: ModelWriter Architecture, Integration and Evaluation (OBEO) - Yvan
        - Architecutre big figure
        - Ferhat's conceptual figure
    - WP7: Standardization, Dissemination and Exploitation (OBEO) - Yvan
        - Dissemination:
             - Academic talk: ATSEN conference
             - Industrial talk: A demo paper in UYMK conference
             - The papers: e.g. Claire's paper (Parsing Text into RDF)
        - Exploitation:
             - New industrial partner: Havelsan (Realised)
             - New (under-negotiation) industrial partner: Ford-Otosan, Turkey (Planned)
             - Exploitation plans of partners: e.g. Yvan exploitation mentioned in PPR excel file (project statement)
             - CSV to OWL transformation program (from Airbus)
        - Standardization:
             - System Installation Component Ontology	(De facto standard) - Anne Monceaux
             - Semantic Annotator	Open Source Software (Standardisation)	Claire Gardent

5. **Demonstrations** (30 min): [**11:00 - 11:30**]
   _prepare a step by step todo list_
   * Phase One: (Mariem and Anne)
      - Semantic parsing and consistency check - Mariem
      - CSV to OWL transformation program (from Airbus)
        - UC demonstrations - Anne?
   * Phase Two: (Ferhat)
     - Import/Export Connectors (Document Parsing)
       - AIRBUS SIDP Documents
       - Havelsan Requirement Documents
     - Document Generation
       - User/Software Requirement Documents
       - User/Software Requirement Review Meeting Documents
   * Phase Three: (Ferhat)
    Configuration File: /eu.modelwriter.demonstration.requirements/SimlifiedConfigurationModel.als (C:\Users\Mete\git\Demonstrations\eu.modelwriter.demonstration.requirements)
    Traceability: C:\Users\Mete\runtime-EclipseApplication\.modelwriter
    - Show Alloy based Configuration Model on Alloy Editor
    - Load and Parse Alloy file on MW Menu
    - Click Preferences on MW menu, show that it is populated, show sets and relations
    - Open "RMF_CustomerRequirementsSpecification.reqif" and "Customer Requirements Specification.md"
    - Divide the screen into two panes, keep the text editor at right, model at left as MW mockup
    - "Customer Requirements Specification.md"
      - Atom1: "Customer Requirements Specification" <- Project
      - Atom2: "UC-1 Create a new SpecObject" <- ContractRequirement
       - Open the same file with XML editor and show the annotation
      - Atom3: "UC-2 Edit SpecObject" <- ContractRequirement
      - Atom4: "UC-3 Delete SpecObject" <- ContractRequirement
      - Relate: (1,2) (1,3) (1,4)  
      - Show Traceability
    - "RMF_CustomerRequirementsSpecification.reqif"
      - Atom5: "Customer Requirement Specification" <- SystemRequirement
      - Atom6: "UC-1" <- SoftwareRequirement
      - Atom7: "UC-2" <- SoftwareRequirement
      - Atom8: "UC-3" <- SoftwareRequirement
      - Relate: (5,6) (5,7) (5,8)
      - Show Traceability
      - Relate (2, 5)
      - Show Traceability
    - "/org.eclipse.rmf.reqif10/model/reqif10.ecore"
      - Atom9: "SpecObject" <- Task
      - Relate (7, 9)
    - "/org.eclipse.rmf.reqif10/src/org/eclipse/rmf/reqif10/SpecObject.java"
      - Atom10: "public interface SpecObject" <- Task
      - Relate (9, 10)
      - Show Traceability
    - Show some navigation on relations, from a text mark go to a model mark etc.


     - Model Editor
        - Different types of models
          - Tabular
          - Tree-based
          - Graphical
          - Abstract Syntax Tree (of Java, C ... )
        - Show marking on ReqIF instance model, ReqIF metamodel  
        - Move model elements and show consistency, show xmi files are also marked.
      - Writer Editor
           - OOXML (.docx) through a text connector
           - Text Editors (.md)
      - Marking and Mapping mechanism
        - mark all
         - mark specification
          - show master/slave relation
        - remove mark
        - map ...
      - Alloy based controls
        - Show markers

6. **Summary of the current status, the achievements and the expectation (Exploitation)** (10min): [**11:30 - 11:45**] - Ferhat
    - Current status: how much we progressed (in WP base), how much deliverables are done/left
    - Achievement: text to RDF, Marker in text and model, linking the concepts
    - What is the next step: KB design, Integration for the 1st release
      - Integration Workshop in Germany, EclipseCon - Poster Session
    - New partners for exploitation: Havelsan and Ford-Otosan
    - Exploitation plans: OBEO (in PPR excel, statement), Hisbim (IPA docx), Airbus (SIDP), UNIT with Havelsan and Ford-Otosan

7. **The reviewers private session** (30 min): [**11:45 - 12:15**]

8. **Feedback session** (15min): [**12:15 - 12:30**]

9. **Lunch** (30 min) [**12:30 - 13:00**]

10. Participants from project partners (13 People):
    - UNIT: Ferhat Erata, Dr. Moharram Challenger
    - KOÇSISTEM: Prof. Geylani Kardas, Hale Gezgen,
    - MANTIS: Prof. Erhan Mengüsoğlu
    - HISBIM: Ersan Gürdoğan, Taskin Kızıl
    - OBEO: Yvan Lussaud
    - AIRBUS: Dr. Anne Monceaux
    - LORIA: Prof. Claire Gardent, Prof. Samuel CRUZ-LARA, and Dr. Mariem Mahfoudh
    - HAVELSAN: Dr. Eray Tuzun

@ModelWriter/consortium