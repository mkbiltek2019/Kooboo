(function() {
    Kooboo.loadJS([
        "/_Admin/Scripts/kooboo/Guid.js",
        "/_Admin/Scripts/lib/jquery.textarea_autosize.min.js"
    ])

    var template = Kooboo.getTemplate("/_Admin/Market/Scripts/components/ReplyPanel.html");

    ko.components.register('reply-panel', {
        viewModel: function(params) {
            var self = this;

            this.type = ko.observable(params.type);
            this.typeId = params.typeId;
            this.parentCommentId = params.parentCommentId || ko.observable(Kooboo.Guid.Empty);

            this.showError = ko.observable(false);

            this.content = ko.validateField({
                required: ''
            })

            this.ableToReply = ko.pureComputed(function() {
                return self.content.isValid();
            })

            this.onReply = function() {
                if (this.content.isValid()) {
                    switch (self.type()) {
                        case 'discussion':
                            Kooboo.Discussion.reply({
                                discussionId: self.typeId(),
                                parentCommentId: self.parentCommentId(),
                                content: self.content()
                            }).then(function(res) {
                                if (res.success) {
                                    Kooboo.EventBus.publish('kb/witkey/component/reply/refresh', {
                                        id: self.typeId(),
                                        parentCommentId: self.parentCommentId()
                                    })
                                    self.content('');
                                }
                            })
                            break;
                        case 'demand':
                            Kooboo.Demand.reply({
                                demandId: self.typeId(),
                                parentCommentId: self.parentCommentId(),
                                content: self.content()
                            }).then(function(res) {
                                if (res.success) {
                                    Kooboo.EventBus.publish('kb/witkey/demand/reply/refresh', {
                                        id: self.typeId(),
                                        parentCommentId: self.parentCommentId()
                                    })
                                    self.content('');
                                }
                            })
                            break;
                    }
                } else {
                    self.showError(true);
                }
            }

            $(".autosize").textareaAutoSize().trigger("keyup");
        },
        template: template
    })
})()