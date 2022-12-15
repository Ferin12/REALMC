var _____WB$wombat$assign$function_____ = function (name) {
    return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name];
};
if (!self.__WB_pmw) {
    self.__WB_pmw = function (obj) {
        this.__WB_source = obj;
        return this;
    }
}
{
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");

    $(document).ready(function () {

        var activeBtn = false;

        $('#year').text(new Date().getFullYear());

        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });

        updateServerOnline();

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });

        $(document).on('click', '.period span', function () {
            let id = $(this).attr('data-id'),
                did = $(this).parent().parent().parent().find('.donate').attr('data-donate'),
                price = $(this).parent().parent().parent().find('.donate').attr('data-' + id);
            $('.period span[data-donate="' + did + '"]').removeClass('active');
            $(this).addClass('active');
            $(this).parent().parent().find('#goPrice').text(price);
            $(this).parent().parent().find('.btnBuy').attr('data-active', id);
        });

        $(document).on('click', '.btnBuy', function () {
            let id = $(this).attr('data-id'),
                type = $(this).attr('data-active'),
                name = $(this).parent().parent().find('.name').text(),
                img = $(this).parent().parent().find('img').attr('src'),
                price = $(this).parent().parent().find('#goPrice').text();
            $('#enterBuy').modal('show');
            $('.btnGoPay').attr('data-id', $(this).attr('data-id'));
            $('.btnGoPay').attr('data-type', $(this).attr('data-active'));
            if (name == 'MVP++ статус') {
                switch (type) {
                    case '1': {
                        period = 'на месяц';
                        break;
                    }
                    case '2': {
                        period = 'на 3 месяца';
                        break;
                    }
                    case '3': {
                        period = 'на 6 месяцев';
                        break;
                    }
                    case '4': {
                        period = 'на год';
                        break;
                    }
                }
            } else {
                if (type == 1) {
                    period = 'на месяц';
                } else {
                    period = 'навсегда';
                }
            }
            $('#imgBuyModal').attr('src', img);
            if (id != 9) {
                $('.btnFloatName').html(name + ' <span style="color: #fbf91e">' + period + '</span> за ' + price + ' руб');
            } else {
                $('.btnFloatName').html('<span style="color: #fbf91e">' + name + '</span> за ' + price + ' руб');
            }

        });

        $(document).on('click', '.btnBuyTime', function () {
            let id = $(this).attr('data-id'),
                type = $(this).attr('data-active'),
                name = $(this).parent().parent().find('.name').text(),
                img = $(this).parent().parent().find('img').attr('src'),
                price = $(this).parent().parent().find('#goPrice').text();
            $('#enterBuyTime').modal('show');
            $('.btnGoPayTime').attr('data-id', $(this).attr('data-id'));
            $('.btnGoPayTime').attr('data-type', $(this).attr('data-active'));
            $('#imgBuyModal').attr('src', "static/img/clocks.png");
            $('.btnFloatName').html('<span style="color: #fbf91e">' + name + '</span> за ' + price + ' руб');

        });

        $('.btnGoPay').click(function () {
            let id = $(this).attr('data-id'),
                type = $(this).attr('data-type');
            $.ajax({
                url: '/donateBuy',
                type: 'POST',
                data: {
                    id: id,
                    type: type,
                    nickname: $('#nickDonate').val()
                },
                success: function (data) {
                    var data = JSON.parse(data);
                    if (data.success) {
                        location.href = data.uri;
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ошибка',
                            text: data.message,
                        });
                    }
                }
            });
        });

        $('.btnGoPayTime').click(function () {
            let id = $(this).attr('data-id'),
                type = $(this).attr('data-type');
            $.ajax({
                url: '/timeBuy',
                type: 'POST',
                data: {
                    id: id,
                    type: type,
                    nickname: $('#nickTime').val()
                },
                success: function (data) {
                    var data = JSON.parse(data);
                    if (data.success) {
                        location.href = data.uri;
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ошибка',
                            text: data.message,
                        });
                    }
                }
            });
        });

        $('#goPayCoins').click(function () {
            $.ajax({
                url: '/donateCoins',
                type: 'post',
                data: {
                    nickname: $('#nickCoins').val(),
                    sum: $('#enterCoins').val()
                },
                success: function (data) {
                    var data = JSON.parse(data);
                    if (data.success) {
                        location.href = data.uri;
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ошибка',
                            text: data.message,
                        });
                    }
                }
            });
        });

        $('#goUnBan').click(function () {
            $.ajax({
                url: '/donateUnban',
                type: 'post',
                data: {
                    nickname: $('#nickUnBan').val()
                },
                success: function (data) {
                    var data = JSON.parse(data);
                    if (data.success) {
                        location.href = data.uri;
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ошибка',
                            text: data.message,
                        });
                    }
                }
            });
        });

    });

    function copyToClipboard() {
        var copyText = document.getElementById("copyIp");
        copyText.select();
        document.execCommand("copy");
    }

    function updateServerOnline() {
        var csns = $.animateNumber.numberStepFactories.separator(" ");
        $.ajax({
            url: "/postOnline",
            type: "GET",
            success: function (data) {
                $("#online").animateNumber(
                    {
                        number: data,
                        numberStep: csns,
                    },
                    500
                );
            },
        });
    }

    function getPriceCoins() {
        let coins = $('#enterCoins').val(),
            rub = coins / 1000;
        if (coins <= 10000000) {
            $('#goPayCoins').text('Перейти к оплате ' + rub.toFixed(2) + ' ₽');
        } else {
            $('#goPayCoins').text('Перейти к оплате');
        }
        return false;
    }
}