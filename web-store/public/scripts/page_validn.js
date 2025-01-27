function text_alpha()
{
	$("[name=txt_name],[name='txt_fname'],[name=txt_lname]").keydown(function (e)
	{
        if (e.shiftKey || e.ctrlKey || e.altKey)
		{
              e.preventDefault();
        } 
		else 
		{
             var key = e.keyCode;
             if (!((key == 8) || (key == 9) ||(key == 16) ||(key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90)))
			{
                  e.preventDefault();
            }
        }
    });
}	
$(document).ready(function()
{
	$("[name=placeorder],[name=mycart]").click(function()
	{
		$(".cart-container").show();
	});
	$("button[id^='add']").click(function()
	{
		//$(this).hide();
		alert("Item has been Added to Your Cart..");
		$("#mycart tr:last").show();
		var item=$(this).siblings('#item').text();
		var price=$(this).siblings('#price').text();
		var qty=$(this).siblings('#qty').val();
		var total=price*qty;
	
		if($("td:contains('"+item+"')").length > 0)
		{
			var lqty=$("td:contains('"+item+"')").next().text();
			var accumqty=parseInt(lqty)+parseInt(qty);
		
			$("td:contains('"+item+"')").siblings('.qty2').text(accumqty);
			total=price*accumqty;
	
			$("td:contains('"+item+"')").siblings('.total').text(total);
		
			var sum=0;
			$(".total").each(function()
			{
				var val = parseInt($(this).text());
				sum+=val;
			});
			$(".subtotal").text(sum);
		
		}
		else
		{
			$("#mycart tr:last").before(
				"<tr>"+
					"<td class='item2' name='inm'>"+item+"</td>"+
					"<td class='qty2' name='qt'>"+qty+"</td>"+
					"<td class='right price2' name='pri'>"+price+"</td>"+
					"<td class='right total' name='tot'>"+total+"</td>"+
					"<td class='right price2'><input type='checkbox' name='record'/></td>"+
				"</tr>"	
			);
			var sum=0;
			$(".total").each(function()
			{
				var val=parseInt($(this).text());
				sum+=val;
			});
			$(".subtotal").text(sum);
		}
	});
});

$(document).ready(function()
{
	$("#modify").click(function()
	{		
		$('#rmv').show();      
    });
});

$(document).ready(function()
{
	$("#rmv").click(function()
	{
		$("table").find('input[name="record"]').each(function()
		{
           	if($(this).is(":checked"))
			{
				$(this).parents("tr").remove();
				var sum=0;
				$(".total").each(function()
				{
					var val=parseInt($(this).text());
					sum+=val;
				});
				$(".subtotal").text(sum);
            }
		});
	});
});
$(document).ready(function()
{
	var SessionArr=new Array();
	$("#confirm").click(function()
	{
		$("#mycart").find('tr').each(function (i, el)
		{
			var $tds = $(this).find('td'),
            name = $tds.eq(0).text(),
            qty = $tds.eq(1).text(),
            price = $tds.eq(2).text();
			total = $tds.eq(3).text();
			
			SessionArr.push(name);
			SessionArr.push(qty);
			SessionArr.push(price);
			SessionArr.push(total);	
			
			//for(var i=4;i< SessionArr.length;i++)
			//{
			//	localStorage.setItem("ItemName",SessionArr[i]);
			//	localStorage.setItem("Quantity",SessionArr[i]);
			//	localStorage.setItem("Price",SessionArr[i]);
			//	localStorage.setItem("Total",SessionArr[i]);
			//}
			localStorage.setItem("Cart",JSON.stringify(SessionArr).trim());
			window.location.href="../TekVision/confirmation.jsp";
		});
	});
});
function closeCart()
{
	$("#closed").click(function()
	{
		$(".cart-container").hide();
	});
}