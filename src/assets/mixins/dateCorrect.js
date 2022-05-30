export default {
    methods: {
        dateCorrect(value) {
            var date = new Date(value)
            var year = date.getFullYear();
            var month = date.getMonth();
            var d = date.getDate();
            let days = ['日', '一', '二', '三', '四', '五', '六', ];
            var day = days[date.getDay()];
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            return year + '年' + month + '月' + d + '日' + '   ' + '  星期' + day + '    ' + hours + '时' + minutes + '分' + seconds + '秒'
        }
    },
}