(function() {
  var self;
  Vue.component("kb-control-file", {
    template: Kooboo.getTemplate(
      "/_Admin/Scripts/vue-components/controlType/File.html"
    ),
    props: {
      field: Object
    },
    inject: ["kbFormItem"],
    data: function() {
      self = this;
      return {
        files: [],
        fileDialogData: null
      };
    },
    mounted: function() {
      var fieldValue = this.kbFormItem.kbForm.model[self.kbFormItem.prop];
      if (fieldValue) {
        if (self.field.isMultipleValue) {
          self.files = fieldValue.map(function(p) {
            return {
              thumbnail: p + "?SiteId=" + Kooboo.getQueryString("SiteId"),
              url: p
            };
          });
        } else {
          self.files = [
            {
              thumbnail:
                fieldValue + "?SiteId=" + Kooboo.getQueryString("SiteId"),
              url: fieldValue
            }
          ];
        }
      } else {
        self.files = [];
      }
    },
    methods: {
      selectFile: function() {
        Kooboo.File.getList().then(function(res) {
          if (res.success) {
            res.model["show"] = true;
            res.model["context"] = self;
            res.model["onAdd"] = function(selected) {
              if (self.field.isMultipleValue) {
                _.forEach(selected, function(sel) {
                  if (!_.some(self.files, { url: sel.url })) {
                    self.files.push({
                      url: sel.url,
                      thumbnail: sel.thumbnail
                    });
                  }
                });
              } else {
                self.files = [
                  {
                    url: selected.url,
                    thumbnail: selected.thumbnail
                  }
                ];
              }
            };
            self.fileDialogData = res.model;
          }
        });
      },
      removeFile: function(file) {
        self.files = _.without(self.files, file);
      }
    },
    watch: {
      files: function(value) {
        if (self.field.isMultipleValue) {
          self.kbFormItem.kbForm.model[self.kbFormItem.prop] = value.map(
            function(v) {
              return v.url;
            }
          );
        } else {
          self.kbFormItem.kbForm.model[self.kbFormItem.prop] = value.length
            ? value[0].url
            : null;
        }
      }
    },
    beforeDestroy: function() {
      self = null;
    }
  });
})();
