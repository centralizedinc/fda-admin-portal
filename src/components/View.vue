<template>
  <div class="xs-center">
    <v-dialog
      v-model="show"
      scrollable
      :overlay="false"
      max-width="800px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title
          primary-title
          class="headline"
          style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
        >ADD Accounts</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-card-text>Please enter your registered email address. Access the link in your mail to login with your new password.</v-card-text>
          <v-divider></v-divider>
          <v-flex xs12 pa-5>
            <v-card-text>
                Please enter your registered email address. Access the link in your mail to login with your new password.
                Please enter your registered email address. Access the link in your mail to login with your new password.
                Please enter your registered email address. Access the link in your mail to login with your new password.
                Please enter your registered email address. Access the link in your mail to login with your new password.
                Please enter your registered email address. Access the link in your mail to login with your new password.
                Please enter your registered email address. Access the link in your mail to login with your new password.
                Please enter your registered email address. Access the link in your mail to login with your new password.
                Please enter your registered email address. Access the link in your mail to login with your new password.
            </v-card-text>
          </v-flex>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn slot="activator" color="success" class="font-weight-light" @click.native.stop="apply">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    parA:
      "I, duly authorized officer/s or representative/s of the Establishment hereby voluntarily and categorically declare, undertake, and agree that all data and information contained and provided in the attached application, together with all other submissions, including amendments, are true and correct based on my knowledge and are based on existing records, legal documents and available information.",
    parB: "I, likewise declares, undertakes and agrees that:",
    par1:
      "The said establishment shall be open during its business hours under the supervision of a PRC registered professional (e.g. Pharmacists) or authorized personnel at all times;",
    par2:
      "The pharmacist/s and the other appropriate allied health professionals, upon and during employment in the establishment, is/are not and will not in any way be connected to, employed by or engaged with any other FDA-regulated establishment;",
    par3:
      "The approved and valid License to Operate shall be displayed in a conspicuous place in the establishment visible to my customers. The approved and valid License to Operate shall be displayed in a conspicuous place in the establishment visible to my customers;",
    par4:
      "The establishment will change its business name, and/or brand name in the case of products, in the event that there is a similar, same, or confusingly similar name registered with the Food and Drug Administration, or if the FDA rules later that such name is misleading, offensive, against the law, customs, public morals, public policy or otherwise violative of relevant rules and regulations;",
    par5:
      "The electronic copy of the files, documents, or information submitted in relation to this application are the exact duplicate or scanned copy of the same and, any discrepancy, prejudicial contents, false claims or misrepresentation on any of the data therein shall be a ground for the disapproval of application, or if discovered post-approval shall be a ground for the appropriate sanctions including the revocation of the license or, and/or the filing of the appropriate legal action against me, the owner, its officers or the establishment whenever possible;",
    par6:
      "If applying for automatic renewal, the establishment has filed the application, and have paid the complete & appropriate renewal fee before expiry date and in which case there are no changes or variations in the establishment since last renewal of LTO specifically but not limited to a change of location, change of ownership, change of business name, change of registered pharmacist, change in warehouse site, additional supplier and product lines, change in activity, change in key personnel;",
    par7:
      "The products that my establishment manufacture, distribute and/or sell are registered or to be registered with FDA prior to distribution or sale, and that we assume primary responsibility and/or stewardship over the product in case of liability, adverse events, and/or other public health & safety issues;",
    par8:
      "The establishment whether for initial, renewal or automatic renewal, is still subject to inspection by FDA’s authorized representatives at any reasonable time and the establishment and its personnel and officers undertake to respond and cooperate fully with the FDA as regards any subsequent post-marketing activity;",
    par9:
      "Non-compliance with the requirements and/or failure to give notice to the FDA of the change in business address, business name, ownership, or any other circumstances in relation to the approval of this application is a ground for the revocation of the License to Operate;",
    par10:
      "The above declarations and undertakings which are based on existing regulations are deemed conditions for the approval of the LTO and therefore non-compliance or defiance after approval can be a cause for SUSPENSION, CANCELLATION, REVOCATION of the License to Operate which shall be guided by the provisions of Republic Act 3720 as amended by Republic Act 9711 and other relevant laws, rules and regulations;",
    par11:
      "This document is executed in full knowledge and awareness of Republic Act 3720, as amended by Republic Act 9711, otherwise known as the Food and Drug Administration Act of 2009, other relevant laws and their implementing rules and regulations; and",
    par12:
      "I and the establishment herein represented grants authority to the Food and Drug administration to verify through government and private resources the veracity of the information provided in all submissions and the authenticity of all the documents attached or submitted."
  }),
  methods: {
    apply() {
      this.$emit("proceed");
      // this.$router.push("/app/licenses/apply");
    }
  }
};
</script>

<style>
</style>
